# -*- mode: ruby -*-
# vi: set ft=ruby :

MESSAGE = <<-MESSAGE

WELCOME to

 _____   _____         __   __  _____  _     _ _     _ _______
|_____] |     | |        \\_/   |_____] |_____| |     | |______
|       |_____| |_____    |    |       |     | |_____| ______|

Have fun!

MESSAGE

# The list of packages we want to install
INSTALL = <<-INSTALL
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y nodejs npm zsh git tmux libffi-dev libncurses5-dev xvfb build-essential libssl-dev curl git-core
sudo apt-get install -y mongodb-org=3.2.3 mongodb-org-server=3.2.3 mongodb-org-shell=3.2.3 mongodb-org-mongos=3.2.3 mongodb-org-tools=3.2.3

INSTALL

SETUP = <<-SETUP

# install latest nvm to vagrant
git clone git://github.com/creationix/nvm.git /home/vagrant/.nvm
. /home/vagrant/.nvm/nvm.sh

# install latest stable node
nvm install stable
nvm alias default stable

# make sure npm is up to date
sudo npm install -g npm

# set user bash to zsh
sudo chsh -s /bin/zsh vagrant

SETUP

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.post_up_message = MESSAGE

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 5242, host: 5242

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "10.1.1.10"

  config.vm.provision "shell", inline: INSTALL
  # config.vm.provision "shell", inline: SETUP


  # add local git and zsh config
  config.vm.provision "file", source: "~/.gitconfig", destination: "~/.gitconfig"
  # config.vm.provision "file", source: ".infrastructure/vagrant/zshrc", destination: "~/.zshrc"

  # tuned options for best webpack watch performance, see
  # https://blog.inovex.de/doh-my-vagrant-nfs-is-slow/
  config.vm.synced_folder ".", "/vagrant",  type: 'nfs', mount_options: ['rw', 'vers=3', 'tcp', 'fsc' ,'actimeo=1']

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = ".infrastructure/puppet/manifests"
    puppet.module_path    = ".infrastructure/puppet/modules"
    puppet.manifest_file = "main.pp"
    puppet.options       = ["--verbose"]
  end

  # # configure mongodb
  # config.vm.define :mongodb do |mongodb|
  #   mongodb.vm.network :private_network, ip: "10.1.1.10"
  #   mongodb.vm.network :forwarded_port, host: 27018, guest: 27017
  #
  #   mongodb.vm.hostname = "mongodb"
  #
  #   mongodb.vm.provider 'virtualbox' do |v|
  #     v.customize ['modifyvm', :id, '--name', 'ubuntu1404-mongodb3']
  #     v.customize ['modifyvm', :id, '--cpus', '1']
  #     v.customize ['modifyvm', :id, '--memory', 1024]
  #   end
  #
  #   mongodb.vm.provision :puppet do |puppet|
  #     puppet.manifests_path = ".infrastructure/puppet/manifests"
  #     puppet.manifest_file  = "main.pp"
  #     puppet.options        = ["--verbose"]
  #   end
  # end

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   sudo apt-get update
  #   sudo apt-get install -y apache2
  # SHELL
end
