package middlewares

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Middleware struct {
	db *sql.DB
}

func NewMiddleware(db *sql.DB) *Middleware {
	return &Middleware{db: db}
}

func (m *Middleware) SetTenantMiddleware() gin.HandlerFunc {
	return func(gc *gin.Context) {
		tenantID := gc.Request.Header.Get("X-Tenant-ID")

		if tenantID == "" {
			gc.JSON(http.StatusBadRequest, gin.H{"error": "empty tenant_id"})
			gc.Abort()
			return
		}

		_, err := m.db.Exec("SET SESSION current_tenant_id = $1", tenantID)
		if err != nil {
			gc.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set tenant"})
			gc.Abort()
			return
		}

		gc.Next()
	}
}
