# password-manager-web

## Project Infrastructure
![Project_Architecture](https://github.com/lebroz/password-manager-web/blob/master/_docs/architecture_schema.png?raw=true)

# Requirements

This project uses [this module](https://github.com/hashicorp/terraform-google-vault/tree/master/examples/vault-cluster-private-with-public-lb) to setup the infrastructure on Google Cloud Platform.

You will need to create google images with [this module](https://github.com/hashicorp/terraform-google-vault/tree/master/examples/vault-consul-image) using [Packer](https://www.packer.io/) from Hashicorp.

Once the infrastructure is setup you can use the website.

# Description

## Login Page
![Login_Page](https://github.com/lebroz/password-manager-web/blob/master/_docs/login_page.png?raw=true)

## Home page
![Main_Page](https://github.com/lebroz/password-manager-web/blob/master/_docs/main_all_password.png?raw=true)

## Create New Secret
![Create_New_Password](https://github.com/lebroz/password-manager-web/blob/master/_docs/create_new_password.png?raw=true)
 
 
