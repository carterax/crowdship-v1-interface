import { customAlphabet } from 'nanoid';
import { lowercase } from 'nanoid-dictionary';

const nanoid = customAlphabet(lowercase, 15);

export default nanoid;
