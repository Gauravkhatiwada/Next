#!/bin/bash  
cd /home/ec2-user/next
pm2 start npm --name "next2" -- start
