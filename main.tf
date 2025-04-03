provider "aws" {
  region = "eu-north-1" # Change to your preferred region
}

resource "aws_instance" "app_server" {
  ami           = "ami-0323c940050bcdb62" # Amazon Linux 2 AMI (update as needed)
  instance_type = "t3.micro"              # Adjust based on your needs
  key_name      = "moodAura-jenkins"      # Replace with your EC2 key pair name
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  
  tags = {
    Name = "AppServer"
  }
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ec2-user
              EOF
}

resource "aws_security_group" "app_sg" {
  name        = "app-security-group"
  description = "Allow web traffic access"

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS access from anywhere
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH access from anywhere (consider restricting this in production)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Application ports open to anywhere
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "instance_public_ip" {
  value = aws_instance.app_server.public_ip
}
