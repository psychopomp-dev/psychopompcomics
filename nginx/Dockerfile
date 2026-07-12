# Base on official NGINX Alpine image with certbot support
FROM jonasal/nginx-certbot:2.4.1
ARG APP_ENV

# Copy config into user_conf.d so the image can symlink and auto-enable
# once certificates exist (jonasal/nginx-certbot convention).
COPY ./conf.d/psychopompcomics.$APP_ENV.conf /etc/nginx/user_conf.d/psychopompcomics.conf

# Expose the listening port
EXPOSE 80
