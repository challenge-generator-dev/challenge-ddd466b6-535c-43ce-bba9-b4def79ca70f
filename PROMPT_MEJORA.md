# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `GET /api/orders/events`
- `client` expone http (api: http://localhost:3000):
  - `GET /api/orders/events`

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2

### Brecha de conocimiento
Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real (corrida e2e 20261110141755634), Publica y consume eventos de un topic Kafka y refleja los mensajes en la interfaz

### Misión / candidato
Mostrar en vivo el estado de las ordenes

### Reto
- Tema: Consumo de eventos en tiempo real con Kafka
- Seniority: advanced-l2
- Tipo: practical
- Título: Consumo de eventos en tiempo real con Kafka
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial — objetivo: Configurar el entorno para consumir eventos de Kafka. — entregable (NO resolver): Configuración de Kafka y conexión inicial desde la aplicación Angular.
- Fase 2: Consumo de eventos — objetivo: Implementar la lógica para consumir eventos de Kafka y mostrarlos en la interfaz. — entregable (NO resolver): Lógica para consumir y mostrar eventos de Kafka en la interfaz de usuario.
- Fase 3: Manejo de errores y optimización — objetivo: Mejorar la robustez y eficiencia del consumo de eventos. — entregable (NO resolver): Mecanismos de manejo de errores y optimización del consumo de eventos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "orders-api",
  "version": "1.0.0",
  "description": "API para consumo de eventos de órdenes en tiempo real con Kafka",
  "main": "dist/main.js",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "11.0.0",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "11.0.0",
    "@nestjs/platform-express": "11.0.0",
    "@nestjs/websockets": "11.0.0",
    "class-validator": "^0.14.0",
    "kafkajs": "^2.2.4",
    "reflect-metadata": "^0.2.0",
    "rimraf": "^5.0.5",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "11.0.0",
    "@nestjs/schematics": "11.0.0",
    "@nestjs/testing": "11.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/supertest": "^2.0.16",
    "@typescript-eslint/eslint-plugin": "^7.0.1",
    "@typescript-eslint/parser": "^7.0.1",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "5.7.2"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "strict": true
  },
  "exclude": [
    "node_modules",
    "dist",
    "test",
    "**/*.spec.ts"
  ]
}

// === ARCHIVO: api/src/orders/dto/order-event.dto.ts ===
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class OrderEventDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status!: OrderStatus;

  @IsDateString()
  @IsNotEmpty()
  updatedAt!: Date;

  @IsString()
  @IsNotEmpty()
  customerId!: string;

  constructor(partial: Partial<OrderEventDto>) {
    Object.assign(this, partial);
  }
}

// === ARCHIVO: api/src/kafka/kafka.module.ts ===
import { Module, Global, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    await this.kafkaService.connect();
  }

  async onModuleDestroy() {
    await this.kafkaService.disconnect();
  }
}

// === ARCHIVO: api/src/kafka/kafka.service.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload, KafkaMessage } from 'kafkajs';
import { Observable, Subject, map } from 'rxjs';
import { OrderEventDto } from '../orders/dto/order-event.dto';

interface OrderEventData {
  orderId: string;
  status: string;
  updatedAt: string;
  customerId: string;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private consumer!: Consumer;
  private readonly eventsSubject = new Subject<OrderEventDto>();
  private isConnected = false;
  private readonly retryAttempts = 3;
  private readonly retryDelay = 1000;

  private readonly config = {
    clientId: process.env.KAFKA_CLIENT_ID || 'orders-api',
    brokers: this.parseBrokers(),
    topic: process.env.KAFKA_TOPIC || 'ordenes-topic',
    groupId: process.env.KAFKA_GROUP_ID || 'orders-consumer-group',
  };

  constructor() {
    this.kafka = new Kafka({
      clientId: this.config.clientId,
      brokers: this.config.brokers,
      retry: {
        initialRetryTime: 100,
        retries: this.retryAttempts,
      },
    });
  }

  private parseBrokers(): string[] {
    const brokersEnv = process.env.KAFKA_BROKERS;
    if (!brokersEnv) {
      this.logger.warn('KAFKA_BROKERS not set, using default localhost:9092');
      return ['localhost:9092'];
    }
    return brokersEnv.split(',').map((b) => b.trim());
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      this.logger.log('Kafka consumer already connected');
      return;
    }

    try {
      this.consumer = this.kafka.consumer({ groupId: this.config.groupId });
      await this.consumer.connect();
      this.isConnected = true;
      this.logger.log(`Connected to Kafka brokers: ${this.config.brokers.join(', ')}`);
      
      await this.consumer.subscribe({ topic: this.config.topic, fromBeginning: false });
      this.logger.log(`Subscribed to topic: ${this.config.topic}`);

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to connect to Kafka: ${err.message}`, err.stack);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected || !this.consumer) {
      return;
    }

    try {
      await this.consumer.disconnect();
      this.isConnected = false;
      this.logger.log('Disconnected from Kafka');
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error disconnecting from Kafka: ${err.message}`, err.stack);
    }
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
    const { topic, partition, message } = payload;

    if (!message.value) {
      this.logger.warn(`Received message without value on ${topic}[${partition}]`);
      return;
    }

    try {
      const eventData = this.parseMessageValue(message);
      
      if (this.isValidOrderEvent(eventData)) {
        const orderEvent: OrderEventDto = {
          orderId: eventData.orderId,
          status: eventData.status as OrderEventDto['status'],
          updatedAt: new Date(eventData.updatedAt),
          customerId: eventData.customerId,
        };
        
        this.eventsSubject.next(orderEvent);
        this.logger.debug(`Processed event for order: ${orderEvent.orderId}, status: ${orderEvent.status}`);
      } else {
        this.logger.warn(`Invalid event data received: ${JSON.stringify(eventData)}`);
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error processing message: ${err.message}`, err.stack);
    }
  }

  private parseMessageValue(message: KafkaMessage): OrderEventData {
    try {
      const value = message.value;
      if (!value) {
        return { orderId: '', status: '', updatedAt: '', customerId: '' };
      }
      const parsed = JSON.parse(value.toString());
      return parsed as OrderEventData;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to parse message value: ${err.message}`);
      return { orderId: '', status: '', updatedAt: '', customerId: '' };
    }
  }

  private isValidOrderEvent(data: OrderEventData): boolean {
    return (
      typeof data.orderId === 'string' &&
      data.orderId.length > 0 &&
      typeof data.status === 'string' &&
      data.status.length > 0 &&
      typeof data.updatedAt === 'string' &&
      data.updatedAt.length > 0 &&
      typeof data.customerId === 'string' &&
      data.customerId.length > 0
    );
  }

  getEventsStream(): Observable<OrderEventDto> {
    return this.eventsSubject.asObservable().pipe(
      map((event) => {
        return { ...event, updatedAt: new Date(event.updatedAt) };
      }),
    );
  }

  async reconnect(): Promise<void> {
    this.logger.log('Attempting to reconnect to Kafka...');
    await this.disconnect();
    await this.connect();
  }

  isHealthy(): boolean {
    return this.isConnected;
  }
}

// === ARCHIVO: api/src/shared/exceptions/order-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class OrderExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(OrderExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetails: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        errorDetails = responseObj;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      
      if (this.isKafkaRelatedError(exception)) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Kafka service temporarily unavailable';
        errorDetails = {
          service: 'kafka',
          originalError: exception.message,
        };
      } else if (this.isValidationError(exception)) {
        status = HttpStatus.BAD_REQUEST;
        errorDetails = { validation: exception.message };
      }
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...errorDetails,
    };

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json(errorResponse);
  }

  private isKafkaRelatedError(error: Error): boolean {
    const kafkaErrorPatterns = [
      'kafka',
      'broker',
      'consumer',
      'producer',
      'connection',
      'disconnected',
    ];
    const lowerMessage = error.message.toLowerCase();
    return kafkaErrorPatterns.some((pattern) => lowerMessage.includes(pattern));
  }

  private isValidationError(error: Error): boolean {
    const validationPatterns = ['validation', 'invalid', 'malformed'];
    const lowerMessage = error.message.toLowerCase();
    return validationPatterns.some((pattern) => lowerMessage.includes(pattern));
  }
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { OrderExceptionFilter } from './shared/exceptions/order-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new OrderExceptionFilter());

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicación iniciada en http://localhost:${port}`);
  logger.log('Endpoints disponibles:');
  logger.log('  - GET /api/orders/events (Stream SSE de eventos de órdenes)');
}

bootstrap();

// === ARCHIVO: api/src/app.module.ts ===
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    KafkaModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('AppModule inicializado');
    this.logger.log('Módulos cargados: KafkaModule, OrdersModule');
  }
}

// === ARCHIVO: api/src/orders/orders.controller.ts ===
import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { OrdersService } from './orders.service';
import { OrderEventDto } from './dto/order-event.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('events')
  sse(@Res() res: Response): Observable<any> {
    return this.ordersService.getOrderEventsStream().pipe(
      map((event: OrderEventDto) => ({
        type: 'order-event',
        data: event,
      }))
    );
  }
}

// === ARCHIVO: api/src/orders/orders.service.ts ===
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Subject, Observable, fromEvent, takeUntil } from 'rxjs';
import { Response } from 'express';
import { KafkaService } from '../kafka/kafka.service';
import { OrderEventDto } from './dto/order-event.dto';

@Injectable()
export class OrdersService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersService.name);
  private readonly destroy$ = new Subject<void>();
  private activeConnections: Map<string, Response> = new Map();

  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('OrdersService inicializado');
    
    if (!this.kafkaService.isHealthy()) {
      this.logger.warn('KafkaService no está saludable al iniciar OrdersService');
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.destroy$.next();
    this.destroy$.complete();
    
    for (const [connectionId, res] of this.activeConnections) {
      if (!res.headersSent) {
        res.status(503).json({ error: 'Servicio cerrando' });
      } else {
        res.end();
      }
      this.logger.log(`Conexión SSE cerrada: ${connectionId}`);
    }
    this.activeConnections.clear();
  }

  getOrderEventsStream(): Observable<OrderEventDto> {
    this.logger.log('Obteniendo stream de eventos de órdenes');
    
    const kafkaStream = this.kafkaService.getEventsStream();
    
    return kafkaStream.pipe(
      takeUntil(this.destroy$)
    );
  }

  handleClientDisconnect(connectionId: string): void {
    this.activeConnections.delete(connectionId);
    this.logger.log(`Cliente desconectado: ${connectionId}. Conexiones activas: ${this.activeConnections.size}`);
  }

  registerConnection(connectionId: string, res: Response): void {
    this.activeConnections.set(connectionId, res);
    this.logger.log(`Nueva conexión SSE registrada: ${connectionId}. Total: ${this.activeConnections.size}`);
  }

  broadcastToAll(event: OrderEventDto): number {
    let sentCount = 0;
    const message = `data: ${JSON.stringify(event)}\n\n`;
    
    for (const [connectionId, res] of this.activeConnections) {
      try {
        if (!res.headersSent) {
          res.write(message);
          sentCount++;
        }
      } catch (error) {
        this.logger.error(`Error enviando a conexión ${connectionId}: ${error}`);
        this.activeConnections.delete(connectionId);
      }
    }
    
    return sentCount;
  }

  getActiveConnectionsCount(): number {
    return this.activeConnections.size;
  }
}

// === ARCHIVO: api/src/orders/orders.module.ts ===
import { Module, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersModule.name);

  async onModuleInit(): Promise<void> {
    this.logger.log('OrdersModule inicializado');
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('OrdersModule destruido');
  }
}

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.0.0",
    "@angular/common": "20.0.0",
    "@angular/compiler": "20.0.0",
    "@angular/core": "20.0.0",
    "@angular/forms": "20.0.0",
    "@angular/platform-browser": "20.0.0",
    "@angular/platform-browser-dynamic": "20.0.0",
    "@angular/router": "20.0.0",
    "@angular/material": "^19.2.19",
    "rxjs": "^7.8.1",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.1",
    "@ngrx/effects": "^20.1.0",
    "@ngrx/store": "^20.1.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "~20.0.0",
    "@angular/compiler-cli": "20.0.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "5.8.2"
  }
}


// === ARCHIVO: client/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "client": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/client",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [],
            "scripts": []
          },
          "configurations": {
            "development": {
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "namedChunks": false,
              "extractLicenses": false,
              "vendorChunk": true,
              "buildOptimizer": false
            },
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "client:build"
          },
          "configurations": {
            "development": {
              "browserTarget": "client:build:development"
            },
            "production": {
              "browserTarget": "client:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "client:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [],
            "scripts": []
          }
        }
      }
    }
  },
  "defaultProject": "client",
  "cli": {
    "analytics": false
  }
}


// === ARCHIVO: client/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom",
      "dom.iterable"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "allowSyntheticDefaultImports": true
  }
}

// === ARCHIVO: client/src/app/shared/models/order-event.model.ts ===
import { InjectionToken } from '@angular/core';

export interface OrderEvent {
  orderId: string;
  status: 'pending' | 'processed' | 'delivered';
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export const ORDER_EVENTS_API_URL = new InjectionToken<string>('ORDER_EVENTS_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api/orders/events'
});


// === ARCHIVO: client/src/app/core/services/order-events.service.ts ===
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORDER_EVENTS_API_URL } from '../../shared/models/order-event.model';
import { OrderEvent } from '../../shared/models/order-event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderEventsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(ORDER_EVENTS_API_URL);

  private readonly _events = signal<OrderEvent[]>([]);
  readonly events = this._events.asReadonly();

  private eventSource: EventSource | null = null;

  connect(): void {
    if (this.eventSource) {
      return;
    }

    this.eventSource = new EventSource(this.apiUrl);

    this.eventSource.onmessage = (event) => {
      const newEvent: OrderEvent = JSON.parse(event.data);
      this._events.update(events => [...events, newEvent]);
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      this.disconnect();
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  getEvents(): Observable<OrderEvent[]> {
    return this.http.get<OrderEvent[]>(this.apiUrl);
  }
}


// === ARCHIVO: client/src/app/core/interceptors/error.interceptor.ts ===
import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly snackBar = inject(MatSnackBar);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error desconocido';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
        }

        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

export const errorInterceptor = ErrorInterceptor;

// === ARCHIVO: client/src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Client - Sistema de Órdenes en Tiempo Real</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sistema de gestión de órdenes en tiempo real con eventos Kafka">
  <meta name="theme-color" content="#1976d2">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="http://localhost:3000">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
  <noscript>
    <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
      <h1>JavaScript requerido</h1>
      <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: client/src/app/features/orders/orders.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderEventsService } from '../../core/services/order-events.service';
import { OrderEvent } from '../../shared/models/order-event.model';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    OrderCardComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly orderEventsService = inject(OrderEventsService);
  
  private readonly _isLoading = signal<boolean>(true);
  private readonly _error = signal<string | null>(null);
  private readonly _orders = signal<OrderEvent[]>([]);
  private readonly _connectionStatus = signal<'connected' | 'disconnected' | 'connecting'>('disconnected');
  
  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly orders = computed(() => this._orders());
  readonly connectionStatus = computed(() => this._connectionStatus());
  
  readonly pendingCount = computed(() => 
    this._orders().filter(o => o.status === 'pending').length
  );
  
  readonly processedCount = computed(() => 
    this._orders().filter(o => o.status === 'processed').length
  );
  
  readonly deliveredCount = computed(() => 
    this._orders().filter(o => o.status === 'delivered').length
  );
  
  readonly hasOrders = computed(() => this._orders().length > 0);
  
  ngOnInit(): void {
    this.connectToEvents();
  }
  
  ngOnDestroy(): void {
    this.disconnectFromEvents();
  }
  
  private connectToEvents(): void {
    this._connectionStatus.set('connecting');
    this._isLoading.set(true);
    this._error.set(null);
    
    this.orderEventsService.connect();
    
    this.orderEventsService.getEvents().subscribe({
      next: (events: OrderEvent[]) => {
        this._orders.set(events);
        this._isLoading.set(false);
        this._connectionStatus.set('connected');
      },
      error: (err: Error) => {
        this._error.set(err.message || 'Error al conectar con el servicio de eventos');
        this._isLoading.set(false);
        this._connectionStatus.set('disconnected');
      }
    });
  }
  
  private disconnectFromEvents(): void {
    this.orderEventsService.disconnect();
    this._connectionStatus.set('disconnected');
  }
  
  reconnect(): void {
    this.disconnectFromEvents();
    setTimeout(() => this.connectToEvents(), 500);
  }
  
  clearError(): void {
    this._error.set(null);
  }
  
  trackByOrderId(index: number, order: OrderEvent): string {
    return order.orderId;
  }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.html ===
<div class="orders-container">
  <header class="orders-header">
    <h1 class="title">Panel de Órdenes en Tiempo Real</h1>
    <div class="connection-status" [class]="connectionStatus()">
      <span class="status-indicator"></span>
      <span class="status-text">
        @if (connectionStatus() === 'connected') {
          Conectado
        } @else if (connectionStatus() === 'connecting') {
          Conectando...
        } @else {
          Desconectado
        }
      </span>
    </div>
  </header>
  
  @if (isLoading()) {
    <div class="loading-container">
      <mat-spinner diameter="48"></mat-spinner>
      <p class="loading-text">Cargando eventos de órdenes...</p>
    </div>
  }
  
  @if (error()) {
    <div class="error-banner">
      <mat-icon class="error-icon">error_outline</mat-icon>
      <span class="error-message">{{ error() }}</span>
      <button mat-button color="primary" (click)="reconnect()">
        Reintentar
      </button>
    </div>
  }
  
  <section class="stats-section" [class.hidden]="!hasOrders()">
    <div class="stat-card pending">
      <mat-icon>schedule</mat-icon>
      <div class="stat-info">
        <span class="stat-value">{{ pendingCount() }}</span>
        <span class="stat-label">Pendientes</span>
      </div>
    </div>
    <div class="stat-card processed">
      <mat-icon>autorenew</mat-icon>
      <div class="stat-info">
        <span class="stat-value">{{ processedCount() }}</span>
        <span class="stat-label">Procesadas</span>
      </div>
    </div>
    <div class="stat-card delivered">
      <mat-icon>check_circle</mat-icon>
      <div class="stat-info">
        <span class="stat-value">{{ deliveredCount() }}</span>
        <span class="stat-label">Entregadas</span>
      </div>
    </div>
  </section>
  
  <main class="orders-grid" [class.hidden]="isLoading() || !hasOrders()">
    @for (order of orders(); track trackByOrderId($index, order)) {
      <app-order-card [order]="order"></app-order-card>
    }
  </main>
  
  @if (!isLoading() && !hasOrders() && !error()) {
    <div class="empty-state">
      <mat-icon>inbox</mat-icon>
      <p>No hay órdenes disponibles</p>
      <button mat-raised-button color="primary" (click)="reconnect()">
        Refrescar
      </button>
    </div>
  }
</div>

// === ARCHIVO: client/src/app/features/orders/orders.component.scss ===
.orders-container {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  letter-spacing: -0.5px;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &.connected {
    background-color: #e8f5e9;
    color: #2e7d32;

    .status-indicator {
      background-color: #4caf50;
      animation: pulse 2s infinite;
    }
  }

  &.connecting {
    background-color: #fff3e0;
    color: #ef6c00;

    .status-indicator {
      background-color: #ff9800;
      animation: blink 1s infinite;
    }
  }

  &.disconnected {
    background-color: #ffebee;
    color: #c62828;

    .status-indicator {
      background-color: #f44336;
    }
  }
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
}

.loading-text {
  color: #666;
  font-size: 16px;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  border-radius: 8px;
  margin-bottom: 24px;
  animation: slideIn 0.3s ease;

  .error-icon {
    color: #f44336;
  }

  .error-message {
    flex: 1;
    color: #c62828;
    font-size: 14px;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;

  &.hidden {
    display: none;
  }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  mat-icon {
    font-size: 32px;
    width: 32px;
    height: 32px;
  }

  &.pending mat-icon {
    color: #ff9800;
  }

  &.processed mat-icon {
    color: #2196f3;
  }

  &.delivered mat-icon {
    color: #4caf50;
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .stat-label {
    font-size: 13px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  animation: fadeIn 0.4s ease;

  &.hidden {
    display: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 16px;
  color: #999;

  mat-icon {
    font-size: 64px;
    width: 64px;
    height: 64px;
    opacity: 0.5;
  }

  p {
    font-size: 18px;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .orders-container {
    padding: 16px;
  }

  .title {
    font-size: 22px;
  }

  .orders-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .orders-grid {
    grid-template-columns: 1fr;
  }
}

// === ARCHIVO: client/src/app/shared/components/order-card/order-card.component.ts ===
import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderEvent } from '../../models/order-event.model';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCardComponent {
  private readonly _order = signal<OrderEvent | null>(null);

  readonly order = this._order.asReadonly();

  readonly statusLabel = computed(() => {
    const status = this._order()?.status;
    if (!status) return '';
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      processed: 'Procesada',
      delivered: 'Entregada'
    };
    return labels[status] || status;
  });

  readonly statusIcon = computed(() => {
    const status = this._order()?.status;
    if (!status) return 'help_outline';
    const icons: Record<string, string> = {
      pending: 'hourglass_empty',
      processed: 'sync',
      delivered: 'check_circle'
    };
    return icons[status] || 'help_outline';
  });

  readonly isPending = computed(() => this._order()?.status === 'pending');
  readonly isProcessed = computed(() => this._order()?.status === 'processed');
  readonly isDelivered = computed(() => this._order()?.status === 'delivered');

  readonly statusClass = computed(() => {
    const status = this._order()?.status;
    if (!status) return '';
    return `status-${status}`;
  });

  readonly formattedDate = computed(() => {
    const date = this._order()?.updatedAt;
    if (!date) return '';
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  });

  readonly hasMetadata = computed(() => {
    const metadata = this._order()?.metadata;
    return metadata !== undefined && Object.keys(metadata).length > 0;
  });

  readonly metadataKeys = computed(() => {
    const metadata = this._order()?.metadata;
    if (!metadata) return [];
    return Object.keys(metadata);
  });

  @Input()
  set orderEvent(value: OrderEvent) {
    this._order.set(value);
  }

  getMetadataValue(key: string): string {
    const metadata = this._order()?.metadata;
    if (!metadata) return '';
    const value = metadata[key];
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }

  trackByKey(index: number, key: string): string {
    return key;
  }
}

// === ARCHIVO: client/src/app/app.component.ts ===
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Sistema de Órdenes en Tiempo Real</h1>
        <nav class="app-nav">
          <a routerLink="/orders" routerLinkActive="active">Órdenes</a>
        </nav>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>© 2024 Sistema de Gestión de Órdenes</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    }

    .app-header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 1.75rem;
      font-weight: 600;
    }

    .app-nav {
      display: flex;
      gap: 1rem;
    }

    .app-nav a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .app-nav a:hover,
    .app-nav a.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .app-main {
      flex: 1;
      padding: 2rem;
      background-color: #f5f7fa;
    }

    .app-footer {
      background-color: #2d3748;
      color: white;
      padding: 1rem 2rem;
      text-align: center;
    }

    .app-footer p {
      margin: 0;
      font-size: 0.875rem;
    }
  `]
})
export class AppComponent {
  title = 'Sistema de Órdenes';
}

// === ARCHIVO: client/src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
};

// === ARCHIVO: client/src/app/app.routes.ts ===
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: '**',
    redirectTo: 'orders'
  }
];

export const appRoutes = routes;

// === ARCHIVO: client/src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';
import { OrderEventsService } from './app/core/services/order-events.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([ErrorInterceptor])
    ),
    provideAnimationsAsync(),
    OrderEventsService
  ]
}).catch(err => console.error('Error al iniciar la aplicación Angular:', err));

// === ARCHIVO: client/tsconfig.app.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts",
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}

// === ARCHIVO: client/tsconfig.spec.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  kafka:
    image: "apache/kafka:3.8.0"
    ports:
      - "127.0.0.1:9092:9092"
    environment:
      KAFKA_NODE_ID: "1"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_LISTENERS: "PLAINTEXT://:9092,CONTROLLER://:9093"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@localhost:9093"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: "1"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: "0"
    healthcheck:
      test: ["CMD-SHELL","/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 > /dev/null 2>&1"]
      interval: 15s
      timeout: 10s
      retries: 10
      start_period: 30s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| Apache Kafka (KRaft, un nodo) | `apache/kafka:3.8.0` | 9092 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/kafka/create-topics.sh ===
#!/usr/bin/env bash
# Crea los topics en Kafka local (idempotente). Ejecutar con el compose levantado y healthy.
set -euo pipefail

docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic app-events --partitions 1 --replication-factor 1

```
