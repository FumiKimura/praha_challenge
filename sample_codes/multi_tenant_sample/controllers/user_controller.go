package controllers

import (
	"sample_codes/multi_tenant_sample/services"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	service *services.Service
}

func NewUserController(s *services.Service) *UserController {
	return &UserController{service: s}
}

func (c *UserController) GetUsersHandler(gc *gin.Context) {
	c.service.GetUsersService()
}
