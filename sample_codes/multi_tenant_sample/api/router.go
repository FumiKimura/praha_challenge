package api

import (
	"database/sql"
	"sample_codes/multi_tenant_sample/controllers"
	"sample_codes/multi_tenant_sample/middlewares"
	"sample_codes/multi_tenant_sample/services"

	"github.com/gin-gonic/gin"
)

func NewRouter(db *sql.DB) *gin.Engine {
	ser := services.NewService(db)
	userCon := controllers.NewUserController(ser)
	mid := middlewares.NewMiddleware(db)

	r := gin.Default()
	r.Use(mid.SetTenantMiddleware())
	r.GET("/users", userCon.GetUsersHandler)

	return r
}
