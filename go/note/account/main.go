package main

import (
	"fmt"
	"hello/utils"
	// "log"
	// "net/http"
	// "os"
	// "os/signal"
	// "syscall"
	// "time"
	// "github.com/gin-gonic/gin"
)

func main() {
	sum := utils.Add(1, 2)
	fmt.Println(134)
	fmt.Println(sum)
	fmt.Println(sum)
	fmt.Println(sum)

	// you could insert your favorite logger here for structured or leveled logging
	// log.Println("Starting server...")

	// router := gin.Default()

	// router.GET("/api/account", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"然然": "是傻逼",
	// 	})
	// })

	// srv := &http.Server{
	// 	Addr:    ":8082",
	// 	Handler: router,
	// }

	// // Graceful server shutdown - https://github.com/gin-gonic/examples/blob/master/graceful-shutdown/graceful-shutdown/server.go
	// go func() {
	// 	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
	// 		log.Fatalf("Failed to initialize server: %v\n", err)
	// 	}
	// }()

	// log.Printf("Listening on port %v\n", srv.Addr)

	// // Wait for kill signal of channel
	// quit := make(chan os.Signal)

	// signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// // This blocks until a signal is passed into the quit channel
	// <-quit

	// // The context is used to inform the server it has 5 seconds to finish
	// // the request it is currently handling
	// ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	// defer cancel()

	// // Shutdown server
	// log.Println("Shutting down server...")
	// if err := srv.Shutdown(ctx); err != nil {
	// 	log.Fatalf("Server forced to shutdown: %v\n", err)
	// }

	// fmt.Println("Press any key to exit...")
	// fmt.Scanln()
}
