package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	rpcURL := os.Getenv("ETH_RPC_URL")
	if rpcURL == "" {
		log.Fatal("ETH_RPC_URL not set")
	}

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to Ethereum")

	blockChan := make(chan uint64)

	go watchBlocks(client, blockChan)

	go processBlocks(blockChan)

	select {}
}

func watchBlocks(client *ethclient.Client, ch chan<- uint64) {
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	var lastBlock uint64 = 0

	for range ticker.C {
		blockNumber, err := client.BlockNumber(context.Background())
		if err != nil {
			log.Println("Error fetching block number:", err)
			continue
		}

		if blockNumber > lastBlock {
			for i := lastBlock + 1; i <= blockNumber; i++ {
				ch <- i
			}
			lastBlock = blockNumber
		}
	}
}

func processBlocks(ch <-chan uint64) {
	for block := range ch {
		fmt.Printf("New block detected: %d\n", block)
	}
}