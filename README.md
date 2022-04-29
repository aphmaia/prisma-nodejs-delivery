# prisma-nodejs-delivery
Projeto desenvolvido durante o curso de NodeJs + Prisma

-> Estrutura do projeto
    Prisma
    Typescript
    Bcrypt
    JsonWebToken
    Express
    ts-node-dev

    // yarn add typescript prisma ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt -D 
    // yarn add express bcrypt jsonwebtoken @prisma/client
    // yarn tsc --init

    //yarn prisma init

-> Criar tabela DeliveryMan
    File:
        ./prisma/schema.prisma

    Code:
        model Deliveryman {
            id          String    @id @default(uuid()) 
            username    String    @unique
            password    String    

            @@map("deliveryman")
        }

    //yarn prisma migrate dev 
    //migration: create_deliveryman

-> Criar tabela Clients
    File:
        ./prisma/schema.prisma

    Code:
        model Clients {
            id          String    @id @default(uuid()) 
            username    String    @unique
            password    String    

            @@map("clients")
        }

    //yarn prisma migrate dev 
    //migration: create_clients

-> Criar tabela Deliveries
    File:
        ./prisma/schema.prisma

    Code:
        model Deliveries {
            id              String       @id @default(uuid()) 
            id_client       String    
            client          Clients       @relation(fields: [id_client], references: [id])
            id_deliveryman  String   
            deliveryman     Deliveryman   @relation(fields: [id_deliveryman], references: [id])    
            item_name       String  
            created_at      DateTime      @default(now())
            end_at          DateTime      @default(now())

            @@map("deliveries")
        } 

    //yarn prisma format
    //yarn prisma migrate dev
    //migration: create_deliveries

    