provider "aws" {
    region = "us-east-1"
}

resource "aws_instance" "app_server" {
    ami           = "ami-0e86e20dae9224db8" # Ubuntu 22.04
    instance_type = "t2.micro"
    key_name      = "your-key-pair"
    security_groups = [aws_security_group.app_sg.name]
    tags = {
        Name = "MoodAuraServer"
    }
}

resource "aws_security_group" "app_sg" {
    name = "app_sg"
    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 8080
        to_port     = 8080
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 3000
        to_port     = 3000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 5432
        to_port     = 5432
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"] # Restrict in production
    }
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

output "instance_ip" {
    value = aws_instance.app_server.public_ip
}
