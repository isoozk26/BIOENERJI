package main

import (
	"crypto/rand"
	"database/sql"
	"embed"
	"encoding/csv"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	_ "modernc.org/sqlite"
)

//go:embed dist/*
var distFS embed.FS

var (
	db            *sql.DB
	sessions      = make(map[string]time.Time)
	sessionsMutex sync.RWMutex
	adminPass     string
)

type Appointment struct {
	ID           int64  `json:"id"`
	Name         string `json:"name"`
	Phone        string `json:"phone"`
	ServiceTitle string `json:"serviceTitle"`
	Notes        string `json:"notes"`
	Status       string `json:"status"`
	CreatedAt    string `json:"createdAt"`
}

type QuizResult struct {
	ID              int64  `json:"id"`
	AnswerSummary   string `json:"answerSummary"`
	DetectedBlockage string `json:"detectedBlockage"`
	CreatedAt       string `json:"createdAt"`
}

func initDB(dbPath string) error {
	dir := filepath.Dir(dbPath)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}
	}

	var err error
	db, err = sql.Open("sqlite", dbPath)
	if err != nil {
		return err
	}

	createTablesQuery := `
	CREATE TABLE IF NOT EXISTS appointments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		phone TEXT NOT NULL,
		service_title TEXT NOT NULL,
		notes TEXT,
		status TEXT DEFAULT 'Yeni',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS quiz_results (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		answer_summary TEXT NOT NULL,
		detected_blockage TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = db.Exec(createTablesQuery)
	return err
}

func generateToken() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func isAuthenticated(r *http.Request) bool {
	cookie, err := r.Cookie("admin_session")
	if err != nil || cookie.Value == "" {
		return false
	}

	sessionsMutex.RLock()
	exp, exists := sessions[cookie.Value]
	sessionsMutex.RUnlock()

	if !exists || time.Now().After(exp) {
		return false
	}
	return true
}

func jsonResponse(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func handleCreateAppointment(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonResponse(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		return
	}

	var req struct {
		Name         string `json:"name"`
		Phone        string `json:"phone"`
		ServiceTitle string `json:"serviceTitle"`
		Notes        string `json:"notes"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "Geçersiz istek"})
		return
	}

	if strings.TrimSpace(req.Name) == "" || strings.TrimSpace(req.Phone) == "" {
		jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "İsim ve telefon zorunludur"})
		return
	}

	res, err := db.Exec(
		"INSERT INTO appointments (name, phone, service_title, notes, status) VALUES (?, ?, ?, ?, 'Yeni')",
		req.Name, req.Phone, req.ServiceTitle, req.Notes,
	)
	if err != nil {
		log.Printf("Randevu kaydedilemedi: %v", err)
		jsonResponse(w, http.StatusInternalServerError, map[string]string{"error": "Veritabanı hatası"})
		return
	}

	id, _ := res.LastInsertId()
	jsonResponse(w, http.StatusOK, map[string]any{"success": true, "id": id})
}

func handleCreateQuizResult(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonResponse(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		return
	}

	var req struct {
		AnswerSummary    string `json:"answerSummary"`
		DetectedBlockage string `json:"detectedBlockage"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "Geçersiz istek"})
		return
	}

	_, err := db.Exec(
		"INSERT INTO quiz_results (answer_summary, detected_blockage) VALUES (?, ?)",
		req.AnswerSummary, req.DetectedBlockage,
	)
	if err != nil {
		log.Printf("Test sonucu kaydedilemedi: %v", err)
		jsonResponse(w, http.StatusInternalServerError, map[string]string{"error": "Veritabanı hatası"})
		return
	}

	jsonResponse(w, http.StatusOK, map[string]bool{"success": true})
}

func handleAdminLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		jsonResponse(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
		return
	}

	var req struct {
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "Geçersiz istek"})
		return
	}

	if req.Password != adminPass {
		jsonResponse(w, http.StatusUnauthorized, map[string]string{"error": "Hatalı şifre"})
		return
	}

	token := generateToken()
	sessionsMutex.Lock()
	sessions[token] = time.Now().Add(24 * 7 * time.Hour) // 7 gün geçerli
	sessionsMutex.Unlock()

	http.SetCookie(w, &http.Cookie{
		Name:     "admin_session",
		Value:    token,
		Path:     "/",
		Expires:  time.Now().Add(24 * 7 * time.Hour),
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})

	jsonResponse(w, http.StatusOK, map[string]bool{"success": true})
}

func handleAdminLogout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("admin_session")
	if err == nil && cookie.Value != "" {
		sessionsMutex.Lock()
		delete(sessions, cookie.Value)
		sessionsMutex.Unlock()
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "admin_session",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
	})

	jsonResponse(w, http.StatusOK, map[string]bool{"success": true})
}

func handleAdminStatus(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, http.StatusOK, map[string]bool{"authenticated": isAuthenticated(r)})
}

func handleAdminAppointments(w http.ResponseWriter, r *http.Request) {
	if !isAuthenticated(r) {
		jsonResponse(w, http.StatusUnauthorized, map[string]string{"error": "Yetkisiz erişim"})
		return
	}

	switch r.Method {
	case http.MethodGet:
		rows, err := db.Query("SELECT id, name, phone, service_title, COALESCE(notes, ''), status, datetime(created_at, 'localtime') FROM appointments ORDER BY id DESC")
		if err != nil {
			jsonResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		defer rows.Close()

		var list []Appointment
		for rows.Next() {
			var a Appointment
			if err := rows.Scan(&a.ID, &a.Name, &a.Phone, &a.ServiceTitle, &a.Notes, &a.Status, &a.CreatedAt); err == nil {
				list = append(list, a)
			}
		}
		if list == nil {
			list = []Appointment{}
		}
		jsonResponse(w, http.StatusOK, list)

	case http.MethodPatch:
		// URL: /api/admin/appointments?id=123
		id := r.URL.Query().Get("id")
		if id == "" {
			jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "ID gerekli"})
			return
		}

		var req struct {
			Status string `json:"status"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "Geçersiz veri"})
			return
		}

		_, err := db.Exec("UPDATE appointments SET status = ? WHERE id = ?", req.Status, id)
		if err != nil {
			jsonResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		jsonResponse(w, http.StatusOK, map[string]bool{"success": true})

	case http.MethodDelete:
		id := r.URL.Query().Get("id")
		if id == "" {
			jsonResponse(w, http.StatusBadRequest, map[string]string{"error": "ID gerekli"})
			return
		}

		_, err := db.Exec("DELETE FROM appointments WHERE id = ?", id)
		if err != nil {
			jsonResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		jsonResponse(w, http.StatusOK, map[string]bool{"success": true})

	default:
		jsonResponse(w, http.StatusMethodNotAllowed, map[string]string{"error": "Method not allowed"})
	}
}

func handleAdminQuizResults(w http.ResponseWriter, r *http.Request) {
	if !isAuthenticated(r) {
		jsonResponse(w, http.StatusUnauthorized, map[string]string{"error": "Yetkisiz erişim"})
		return
	}

	rows, err := db.Query("SELECT id, answer_summary, detected_blockage, datetime(created_at, 'localtime') FROM quiz_results ORDER BY id DESC LIMIT 200")
	if err != nil {
		jsonResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	defer rows.Close()

	var list []QuizResult
	for rows.Next() {
		var q QuizResult
		if err := rows.Scan(&q.ID, &q.AnswerSummary, &q.DetectedBlockage, &q.CreatedAt); err == nil {
			list = append(list, q)
		}
	}
	if list == nil {
		list = []QuizResult{}
	}
	jsonResponse(w, http.StatusOK, list)
}

func handleExportCSV(w http.ResponseWriter, r *http.Request) {
	if !isAuthenticated(r) {
		jsonResponse(w, http.StatusUnauthorized, map[string]string{"error": "Yetkisiz erişim"})
		return
	}

	rows, err := db.Query("SELECT id, name, phone, service_title, COALESCE(notes, ''), status, datetime(created_at, 'localtime') FROM appointments ORDER BY id DESC")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	w.Header().Set("Content-Type", "text/csv; charset=utf-8")
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=osman_ozden_randevular_%s.csv", time.Now().Format("2006-01-02")))

	// UTF-8 BOM for Excel Turkish character support
	w.Write([]byte{0xEF, 0xBB, 0xBF})

	writer := csv.NewWriter(w)
	defer writer.Flush()

	writer.Write([]string{"No", "Danışan Adı Soyadı", "Telefon Numarası", "Talep Edilen Seans", "Notlar", "Durum", "Başvuru Tarihi"})

	for rows.Next() {
		var id int64
		var name, phone, service, notes, status, createdAt string
		if err := rows.Scan(&id, &name, &phone, &service, &notes, &status, &createdAt); err == nil {
			writer.Write([]string{
				fmt.Sprintf("%d", id),
				name,
				phone,
				service,
				notes,
				status,
				createdAt,
			})
		}
	}
}

func handleBackupDB(w http.ResponseWriter, r *http.Request) {
	if !isAuthenticated(r) {
		jsonResponse(w, http.StatusUnauthorized, map[string]string{"error": "Yetkisiz erişim"})
		return
	}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "data/bioenerji.db"
	}

	file, err := os.Open(dbPath)
	if err != nil {
		http.Error(w, "Veritabanı dosyası okunamadı", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=bioenerji_yedek_%s.db", time.Now().Format("2006-01-02_150405")))
	io.Copy(w, file)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "data/bioenerji.db"
	}

	adminPass = os.Getenv("ADMIN_PASSWORD")
	if adminPass == "" {
		adminPass = "Bioenerji_2026"
	}

	if err := initDB(dbPath); err != nil {
		log.Fatalf("Veritabanı başlatılamadı: %v", err)
	}
	log.Printf("SQLite Veritabanı hazır: %s", dbPath)

	mux := http.NewServeMux()

	// API Routes
	mux.HandleFunc("/api/appointments", handleCreateAppointment)
	mux.HandleFunc("/api/quiz", handleCreateQuizResult)
	mux.HandleFunc("/api/admin/login", handleAdminLogin)
	mux.HandleFunc("/api/admin/logout", handleAdminLogout)
	mux.HandleFunc("/api/admin/status", handleAdminStatus)
	mux.HandleFunc("/api/admin/appointments", handleAdminAppointments)
	mux.HandleFunc("/api/admin/quiz-results", handleAdminQuizResults)
	mux.HandleFunc("/api/admin/export/csv", handleExportCSV)
	mux.HandleFunc("/api/admin/backup/db", handleBackupDB)

	// Embedded Static Assets & SPA Router
	subFS, err := fs.Sub(distFS, "dist")
	if err != nil {
		log.Fatalf("Gömülü dosyalar okunamadı: %v", err)
	}
	fileServer := http.FileServer(http.FS(subFS))

	indexFile, err := subFS.Open("index.html")
	var indexHTML []byte
	if err == nil {
		indexHTML, _ = io.ReadAll(indexFile)
		indexFile.Close()
	}

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/")
		if path == "" {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.Write(indexHTML)
			return
		}

		// Check if file exists in embedded FS
		f, err := subFS.Open(path)
		if err == nil {
			f.Close()
			if strings.HasPrefix(path, "assets/") {
				w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
			}
			fileServer.ServeHTTP(w, r)
			return
		}

		// Otherwise serve index.html for SPA routes (e.g. /admin, /#seanslar)
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-cache")
		w.Write(indexHTML)
	})

	addr := ":" + port
	log.Printf("🚀 Osman Özden Bio Enerji Go Sunucusu Başlatıldı: http://localhost%s", addr)
	log.Printf("🔐 Admin Paneli: http://localhost%s/admin (Varsayılan Şifre: %s)", addr, adminPass)

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("Sunucu hatası: %v", err)
	}
}
