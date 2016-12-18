#!/bin/bash

sudo scp -o StrictHostKeyChecking=no -i "/var/lib/jenkins/tictactoe_key.pem" /var/lib/jenkins/workspace/tictactoe/docker-compose.yaml ec2-user@82.221.49.193:docker-compose.yaml

sudo scp -o StrictHostKeyChecking=no -i "/var/lib/jenkins//tictactoe_key.pem" /var/lib/jenkins/workspace/tictactoe/.env ec2-user@82.221.49.193:.env

ssh -i "/var/lib/jenkins//tictactoe_key.pem" ec2-user@82.221.49.193 docker-compose up -d