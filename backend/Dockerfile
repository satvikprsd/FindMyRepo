# -------------------------
# Stage 1: Builder
# -------------------------
FROM python:3.11-slim AS builder

# Set working directory
WORKDIR /app

# Install system dependencies required for building wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install wheel first
RUN pip install --upgrade pip setuptools wheel

# Copy only requirements to leverage caching
COPY requirements.txt .

# Install heavy packages first (prebuilt wheels)
# Example: torch, sentence-transformers, numpy, etc.
RUN pip install --no-cache-dir torch numpy

# Install remaining dependencies from requirements.txt excluding preinstalled
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# -------------------------
# Stage 2: Final Image
# -------------------------
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy only installed packages and app from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /app /app

# Create a non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
