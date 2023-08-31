package services

import (
	"sample_codes/multi_tenant_sample/models"
)

type UserServicer interface {
	GetUsersService(userID int) (models.User, error)
}
