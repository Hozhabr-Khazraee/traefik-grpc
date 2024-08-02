FROM golang:alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

COPY certs/ca.pem /etc/ssl/certs/

RUN go build -o main .

CMD ["./main"]