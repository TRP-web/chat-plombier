import express from "express"
import { Query } from "express-serve-static-core"

export interface ITypeRequest<T, U extends Query> extends express.Request {
    body: T,
    query: U
}

export interface ITypeRequestBody<T> extends express.Request {
    body: T,
}

export interface ITypeRequestQuery<T extends Query> extends express.Request {
    query: T
}