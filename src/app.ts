import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import { fastifyRawBody } from "fastify-raw-body";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes";

const app = fastify({
	bodyLimit: 1048576,
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyRawBody, {
	field: "rawBody",
	global: false,
	encoding: "utf8",
	runFirst: true,
	routes: [],
	jsonContentTypes: [],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: "*",
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Curriculia - Internal API",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(routes);

export { app };
