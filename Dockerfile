FROM docker.geexfinance.com/beta/nginx:latest

ADD ./default.conf /etc/nginx/conf.d/.
ADD ./dist /usr/share/nginx/html
