exec { "apt-get update":
  path => "/usr/bin",
}
package { "mongodb-org":
  ensure => installed
}