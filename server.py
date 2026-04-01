import http.server
import socketserver
import os

PORT = 8080

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        url_parts = self.path.split('?')
        path = url_parts[0].split('#')[0]
        
        if path == '/':
            self.path = '/index.html'
            return super().do_GET()
            
        full_path = self.translate_path(path)
        
        if not os.path.exists(full_path) and not os.path.isdir(full_path):
            if os.path.exists(full_path + ".html"):
                self.path = path + ".html"
                if len(url_parts) > 1:
                    self.path += '?' + url_parts[1]
                    
        return super().do_GET()

Handler = CleanURLHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving internally at http://localhost:{PORT}")
    print("Clean URL mapping is ENABLED: /about -> /about.html")
    httpd.serve_forever()
