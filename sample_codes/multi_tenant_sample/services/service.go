package services

import (
	"database/sql"
	"sample_codes/multi_tenant_sample/models"
	"sample_codes/multi_tenant_sample/repositories"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func (s *Service) GetUsersService() ([]models.User, error) {
	return repositories.SelectUserList(s.db)
}
