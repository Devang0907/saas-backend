-- CreateTable
CREATE TABLE "Metric" (
    "id" SERIAL NOT NULL,
    "hostname" TEXT NOT NULL UNIQUE,
    "cpu_load" DOUBLE PRECISION NOT NULL,
    "memory_used" BIGINT NOT NULL,
    "memory_total" BIGINT NOT NULL,
    "disk_used" BIGINT NOT NULL,
    "disk_total" BIGINT NOT NULL,
    "net_rx" BIGINT NOT NULL,
    "net_tx" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);
