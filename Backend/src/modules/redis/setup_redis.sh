#!/bin/bash

# Automated script to install and configure Redis on Ubuntu
echo "Starting Redis installation and configuration..."

# Update the package list
echo "Updating package list..."
sudo apt update -y

# Install Redis
echo "Installing Redis..."
sudo apt install redis -y

# Verify Redis installation
echo "Verifying Redis installation..."
if redis-server --version >/dev/null 2>&1; then
    echo "Redis successfully installed!"
else
    echo "Redis installation failed. Please check your system setup."
    exit 1
fi

# Start Redis service
echo "Starting Redis service..."
sudo service redis-server start

# Enable Redis to start at boot
echo "Enabling Redis to start at boot..."
sudo systemctl enable redis-server

# Verify Redis is running
echo "Checking Redis status..."
if redis-cli ping | grep -q "PONG"; then
    echo "Redis is running successfully!"
else
    echo "Redis is not running. Please check your installation."
    exit 1
fi

# Configure Redis
REDIS_CONF="/etc/redis/redis.conf"
echo "Configuring Redis..."
if [ -f "$REDIS_CONF" ]; then
    sudo sed -i 's/^bind 127.0.0.1 ::1/bind 0.0.0.0/' "$REDIS_CONF" # Allow connections from all interfaces
    sudo sed -i 's/^# requirepass .*/requirepass teamAredis/' "$REDIS_CONF" # Set a default password
    echo "Persistence settings: Enabling data save every 5 minutes or 100 changes..."
    sudo sed -i 's/^save 900 1/save 300 100/' "$REDIS_CONF" # Adjust save interval
else
    echo "Redis configuration file not found. Skipping configuration changes."
fi

# Restart Redis to apply changes
echo "Restarting Redis to apply configuration changes..."
sudo service redis-server restart

# Final checks
echo "Verifying Redis configuration..."
if redis-cli -a teamAredis ping | grep -q "PONG"; then
    echo "Redis setup and configuration complete!"
    echo "Redis is now accessible with password: teamAredis"
else
    echo "Redis configuration failed. Please check the configuration file."
    exit 1
fi

echo "Setup completed successfully!"