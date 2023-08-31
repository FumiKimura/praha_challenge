package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"sample_codes/multi_tenant_sample/api"

	_ "github.com/lib/pq"
)

var (
	dbConn = fmt.Sprintf("host=127.0.0.1 port=5432 user=postgres password=postgres dbname=docker sslmode=disable")
)

func main() {
	db, err := sql.Open("postgres", dbConn)
	if err != nil {
		log.Fatalf("Failed to connect to DB: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}

	r := api.NewRouter(db)

	log.Println("server started at port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
