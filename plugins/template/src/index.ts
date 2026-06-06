// اسمه: diag
import { registerCommand } from "@vendetta/commands";
import { findByProps, findByStoreName } from "@vendetta/metro";

export default {
    onLoad() {
        registerCommand({
            name: "diag",
            displayName: "diag",
            description: "Diagnose message fetching modules",
            execute: async (args, ctx) => {
                const results = [];
                
                // 1. فحص findByProps fetchMessages
                const m1 = findByProps("fetchMessages");
                results.push(`1. findByProps("fetchMessages"): ${m1 ? Object.keys(m1).filter(k => typeof m1[k] === 'function').join(', ') : 'null'}`);
                
                // 2. فحص findByProps getMessages
                const m2 = findByProps("getMessages");
                results.push(`2. findByProps("getMessages"): ${m2 ? Object.keys(m2).filter(k => typeof m2[k] === 'function').join(', ') : 'null'}`);

                // 3. فحص MessageStore
                try {
                    const ms = findByStoreName("MessageStore");
                    if (ms) {
                        const funcs = Object.keys(ms).filter(k => typeof ms[k] === 'function');
                        results.push(`3. MessageStore functions: ${funcs.filter(f => f.includes('Message') || f.includes('fetch')).join(', ')}`);
                    } else {
                        results.push("3. MessageStore not found");
                    }
                } catch(e) { results.push("3. MessageStore error: " + e.message); }

                // 4. فحص http module
                const http = findByProps("get", "post", "put", "patch", "delete");
                if (http) {
                    results.push(`4. HTTP module found: get=${typeof http.get}`);
                } else {
                    results.push("4. HTTP module not found");
                }

                // 5. فحص request module
                const req = findByProps("request");
                results.push(`5. request module: ${req ? 'found' : 'null'}`);

                return { content: results.join('\n') };
            }
        });
    },
    onUnload() {}
};