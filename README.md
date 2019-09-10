# Low-Carbon #
Low-Carbon TFM development

Para realizar el despliegue de la solución propuesta partimos de un PC con Ubuntu 16.04.6 LTS instalado.
Para la instalación de hyperledger composer vamos a crear un nuevo usuario (hyperledger), ya que debe instalarse como usuario sin privilegios y le vamos a añadir al fichero sudoers. Adquirimos permisos de root “su -” y ejecutamos los siguientes comandos:

    adduser hyperledger
    sudo vi /etc/sudoers

Añadimos la linea: **hyperledger   ALL=(ALL:ALL) ALL** y guardamos el fichero.

Instalamos primeramente **curl**, para proceder a la descarga de los script necesarios:

    sudo apt-get install curl -y
  
Nos logamos en el sistema con el usuario que acabamos de crear __hyperledger__. Procedemos ahora a descargar un script que nos instala los prerrequisitos necesarios para ubuntu.

    curl -O https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh 

Concedemos permisos de ejecución a ese script descargado y lo ejecutamos.

    chmod u+x prereqs-ubuntu.sh 
    ./prereqs-ubuntu.sh 

Esperamos a que finalice y realizamos un __logout__ del sistema y volvemos a conectar.

Importamos el proyecto **Low-Carbon** desde github

    git clone --depth=1 https://github.com/blockpower/Low-Carbon.git

Dentro de la carpeta __Install__ podemos encontrar los scripts necesarios para instalar las aplicaciones que vamos a usar, junto con todos sus prerrequisitos. 



Comenzamos con la instalacion de **Hyperledger Composer**. Otorgamos permisos de ejecución al script de instalación  y lo ejecutamos, esperando hasta que finalice la instalación.

    cd ~/Low-Carbon/Install
    chmod u+x composer_install.sh
    ./composer_install.sh

Continuamos con la instalación de **Hyperledger Fabric**:

    cd ~/Low-Carbon/Install
    chmod u+x fabric_install.sh
    ./fabric_install.sh 

Arrancamos Hyperledger fabric mediante contenedores docker, utilizando el script __startFabric.sh__:

    cd ~/fabric-dev-servers 
    export FABRIC_VERSION=hlfv12 
    ./startFabric.sh 
 
Una vez ha finalizado podemos comprobar que todo esta OK con el comando __docker ps__, comprobando que tenemos arrancados los contenedores necesarios.

Procedemos a crear la __Admin Card__:

    ./createPeerAdminCard.sh
 
Accedemos a la carpeta del proyecto y desplegamos la red. Antes de desplegar la red, debemos de comprobar la version del *.bna que tenemos ya que lo vamos a necesitar posteriormente:

    cd ~/Low-Carbon/lowcarbon
    ls -la
  __nos fijamos en la ultima version disponible del archivo *.bna, en este caso 0.03__

Ahora si, desplegamos la red, donde especificamos la tarjeta creada, asi como el archivo *.bna a desplegar:

    composer network install --card PeerAdmin@hlfv1 --archiveFile lowcarbon@0.0.3.bna

Arrancamos ahora la red de negocio (teniendo en cuenta la versión de archivo *.bna):

    composer network start --networkName lowcarbon --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

e importamos a la red la tarjeta de administrador:

    composer card import --file networkadmin.card

Creamos la API-REST mediante la inicialización del servidor. Para ello ejecutamos un proceso en segundo plano:

    nohup composer-rest-server -c admin@lowcarbon -n never -w true > rest-server.out 2> rest-server.err < /dev/null &

Podemos comprobar que la API-REST está funcionando correctamente introduciendo en nuestro navegador 
__<dirección ip del servidor>:3000__
 


Instalamos los prerrequisitos de **Hyperledger Explorer**. Se nos pedirá una contraseña durante la instalación de mysql. En este caso debemos indicar __consensuando__ para que Hyperledger Explorer funcione correctamente. Posteriormente nos pedirá de nuevo esta contraseña para importar la BBDD de Hyperledger Explorer:

    cd ~/Low-Carbon/Install
    chmod u+x explorer_install.sh
    ./explorer_install.sh 
 
Posteriormente vamos a proceder a publicar el explorador de bloques ejecutando:

    cd ~/Low-Carbon/blockchain-explorer
    npm install
    ./start.sh
    
Podemos comprobar que la API-REST está funcionando correctamente introduciendo en nuestro navegador 
__<dirección ip del servidor>:8080__


Instalamos los prerrequisitos de Angular, para poder levantar la interfaz web que nos permite interactuar con la blockchain:

    cd ~/Low-Carbon/Install
    chmod u+x angular_install.sh
    ./angular_install.sh 
 
Arrancamos ahora el entorno web con Angular. Esta acción toma unos minutos en arrancar:

    cd ~/Low-Carbon/lowcarbon-web/
    nohup ng serve --open --host $IP --port 4200 --disable-host-check > angular-app.out 2> angular-app.err < /dev/null &

Podemos comprobar que la web está funcionando correctamente introduciendo en nuestro navegador 
__<dirección ip del servidor>:4200__


Para realizar la parada de la red ejecutamos el script que se encuentra en el directorio raiz llamado __stop_network.sh__

    cd ~/Low-Carbon
    chmod u+x stop_network.sh
    ./stop_network.sh
    


Para arrancar de nuevo la blockchain junto con todas las aplicaciones, no es necesario repetir todos los pasos anteriores, ya que solo es necesario ir paso a paso la primera vez que se despliega la red. Ejecutando el script __start_network.sh__ es suficiente para levantar de nuevo la red: 

    cd ~/Low-Carbon
    chmod u+x start_network.sh
    ./start_network.sh



Para realizar una actualización (upgrade) de la red, despues de haber generado un nuevo __*.bna__ debemos de situarnos en el directorio del proyecto y ejecutar los siguientes comandos:

    cd ~/Low-Carbon/lowcarbon
    composer archive create -t dir -n .
    composer network install --c PeerAdmin@hlfv1 --a lowcarbon@<new_version>.bna
    composer network upgrade --c PeerAdmin@hlfv1 --n lowcarbon -v<new_version>
    
    
Para inicializar todo desde el principio, deberemos borrar el setup instalado, para ello ejecutaremos en el directorio raíz:
 
    cd ~
    docker kill $( docker ps -q )
    docker rm $( docker ps -aq )
    docker rmi $( docker images dev-* -q )
  
Y procederemos a eliminar la carpeta del proyecto “Low-Carbon”

    cd ~
    rm -rf Low-Carbon
