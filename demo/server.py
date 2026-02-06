#!/usr/bin/env python3
"""
Simple HTTP server for iPractus Demo
Run: python3 server.py
Then open: http://localhost:8000
"""

import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"╔════════════════════════════════════════════════════════╗")
        print(f"║         🏟️  iPractus Navigation Demo Server            ║")
        print(f"╠════════════════════════════════════════════════════════╣")
        print(f"║                                                        ║")
        print(f"║  Server running at:                                    ║")
        print(f"║  → http://localhost:{PORT}                            ║")
        print(f"║  → http://127.0.0.1:{PORT}                            ║")
        print(f"║                                                        ║")
        print(f"║  Press Ctrl+C to stop the server                       ║")
        print(f"║                                                        ║")
        print(f"╚════════════════════════════════════════════════════════╝")
        print()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Goodbye!")
            sys.exit(0)

if __name__ == "__main__":
    run_server()
