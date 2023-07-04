FROM node:16
WORKDIR /app
ARG SET_ENV
COPY package*.json ./
# Cài đặt các dependencies
RUN npm install
COPY . .
RUN npm install -g pm2
# Start ứng dụng bằng PM2
ENV TZ Asia/Ho_Chi_Minh
CMD ["sh", "-c", "pm2 start ecosystem.config.js && pm2 logs"]
