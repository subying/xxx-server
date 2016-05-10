pm2 flush
pm2 start app.js -i max -n book
pm2 logs book
