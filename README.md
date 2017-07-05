# DVSA - APPH065 **'beehive'** spike

## Overview
This is the PoC for the TARS transformation **'beehive'** spike which aims to replicate the TARS Weblogic 8.1 (Java 4) **'Vehicle Type'** page functionality using the following architecture:
- Wildfly 10
- Java 8
- Beehive 1.0.2 (for PageFlows and NetUI tags, etc.)

## Dependencies
The PoC has the following dependencies:
- Maven 3+ [download](http://mirror.ox.ac.uk/sites/rsync.apache.org/maven/maven-3/3.5.0/binaries/apache-maven-3.5.0-bin.zip)
- Ant 1.9 [download](http://apache.mirrors.nublue.co.uk//ant/binaries/apache-ant-1.9.9-bin.zip)
- Java 7 (to generate the beehive artifacts because the dependent 'APT' program was removed in Java 8)
- Java 8 (to run the wildfly application server - using the maven wildfly plugin)

## Running the PoC
### Prerequesities
To get up-and-running with the PoC, you'll need to do the following:
- Set your *PATH* to reference your Java 7, Maven 3+ and Ant 1.9 installations
- Set the *JAVA_HOME* to reference your Java 8 installation

### Starting the wildfly server
1. Using a command-prompt, change directory to the **'wildfly'** directory
2. Execute the following command:
```
mvn wildfly:start wildfly:execute-commands
```
**Note:** the '*execute-commands*' goal is required to change the wildfly servlet container to allow non standard wrappers (required for the beehive tiles templating)
### Building and deploying the PoC application
1. Using a command-prompt, change directory to the **'wildfly'** directory
2. Execute the following command:
```
mvn install
```
**Note:** this will build and deploy the PoC application

3. Using a browser, access the [PoC application URL](https://localhost:8443/APPH065-web-0.1)
4. Click on the '**Test Category -> Vehicle Types**' menu item

### Stopping the wildfly server
1. Using a command-prompt, change directory to the **'wildfly'** directory
2. Execute the following command:
```
mvn wildfly:shutdown
```
