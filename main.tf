# main.tf
provider "aws" {
  region = "eu-north-1"  # Stockholm region
}

# Security Group for MoodAura App
resource "aws_security_group" "moodaura_sg" {
  name        = "moodaura-sec-group"
  description = "Allow SSH and application ports"

  # SSH Access (Restrict to your IP)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["YOUR_IP/32"]  # Replace with your IP e.g., "123.45.67.89/32"
  }

  # MoodAura Client Port
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # MoodAura Backend Port
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

# EC2 Instance for MoodAura App
resource "aws_instance" "moodaura_server" {
  ami           = "ami-0323c940050bcdb62"  # Amazon Linux 2 in eu-north-1
  instance_type = "t3.micro"
  key_name      = "test-key"               # Must match your AWS key pair name
  vpc_security_group_ids = [aws_security_group.moodaura_sg.id]

  # Install Docker and Docker Compose on startup
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ec2-user
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              EOF

  tags = {
    Name = "MoodAura-App-Server"
  }
}

# Output EC2 Public IP for Jenkins Pipeline
output "instance_public_ip" {
  value = aws_instance.moodaura_server.public_ip
}
