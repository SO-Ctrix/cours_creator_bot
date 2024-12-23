import { DataAPIClient } from '@datastax/astra-db-ts';
import { PuppeteerWebBaseLoader} from 'langchain/document_loader/web/puppeteer';
import OpenAI from 'openai';

import { RecoursiveCharacterTextSpliter } from 'langchain/text_splitter'; // LangChain recursively split by character

import "dotenv/config";