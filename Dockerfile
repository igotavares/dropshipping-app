FROM nginx:latest
LABEL maintainer ' <development at igocavalcanti@gmail.com>'

COPY dist/* /usr/share/nginx/html/