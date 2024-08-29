
# Ubuntu API v1.0

The Ubuntu API made using Spring and Java.

## Run Locally

* Clone the project

```bash
  git clone https://qigitea.quinto.site/Sem_Ubuntu002/H202406_Ubuntu_02_back.git
```

* Create an empty database using MariaDB (you can use HeidiSQL or the Command line console)

* Open the project with your favorite IDE (IntelliJ, Spring Tools Suite, Eclipse, Visual Studio Code)

* Create .env file in H202406_Ubuntu_02_back folder. You can use .env.example as an example. Your .env file must have at least, these environment variables:

```bash
  DB_NAME=ubuntudb
  DB_SERVER_URL=jdbc:mariadb://localhost:3306/${DB_NAME}?useSSL=false
  DB_USERNAME=root
  DB_USER_PASSWORD=same_awesome_password
```

* Finally, run the Spring project


## API Reference

After running the project locally, all the documentation is at (change PORT number if necessary): http://localhost:8081/api/v1/swagger-ui/index.html

