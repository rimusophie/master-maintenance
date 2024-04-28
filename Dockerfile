FROM node:22-alpine
WORKDIR /var/www/html/master-maintainance
#WORKDIR /var/www
#RUN apt update
RUN npm install @vue/cli @vue/cli-init
# Viteのサーバーにローカルからアクセスするために開ける
EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev" ]