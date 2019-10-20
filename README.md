# password-manager-web

![Project_Architecture](https://github.com/lebroz/password-manager-web/blob/master/_docs/architecture_schema.png?raw=true)

# Requirements

This project uses [this module](https://github.com/hashicorp/terraform-google-vault/tree/master/examples/vault-cluster-private-with-public-lb) to setup the architecture on Google Cloud Platform.

You will need to create google images with [this module](https://github.com/hashicorp/terraform-google-vault/tree/master/examples/vault-consul-image) using [Packer](https://www.packer.io/) from Hashicorp.

