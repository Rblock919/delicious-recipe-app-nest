import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      path: '/',
      // cors is configured in main.ts
      cors: false,
      // imports: [ConfigModule],
      // useClass: ConfigService,
    }),
    RecipesModule,
    AuthModule.forRoot(process.env.TOKEN_SECRET),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
