package repositories

import (
	"database/sql"
	"sample_codes/multi_tenant_sample/models"
)

func SelectUserList(db *sql.DB) ([]models.User, error) {
	return []models.User{}, nil
}
