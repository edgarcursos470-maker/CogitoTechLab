export const pythonScript = `import tkinter as tk
from tkinter import ttk, scrolledtext
import json
import time
import os
import threading

try:
    import pyautogui
    import pyperclip
    import keyboard
except ImportError:
    print("Please install required packages: pip install pyautogui pyperclip keyboard")
    exit(1)

# ==========================================
# GhostScanner v2.4.0-STABLE
# ==========================================
# Automação Assistida via Interface Gráfica
# Lê 'produtos.json' e pesquisa via clicks.
# ==========================================

class GhostScannerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("GhostScanner v2.4.0-STABLE")
        self.root.geometry("600x500")
        self.root.configure(bg="#0f172a")
        self.running = False
        
        # Styler (Tema Escuro)
        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TLabel', background='#0f172a', foreground='#e2e8f0', font=('Helvetica', 10, 'bold'))
        style.configure('TButton', font=('Helvetica', 10, 'bold'))
        
        # Configuracoes
        ttk.Label(root, text="Load Delay (Segundos):").pack(pady=5)
        self.delay_var = tk.DoubleVar(value=3.5)
        ttk.Entry(root, textvariable=self.delay_var).pack(pady=5)
        
        # Botões de Controle
        self.start_btn = tk.Button(root, text="INICIAR VARREDURA [F9]", bg="#2563eb", fg="white", 
                                   font=('Helvetica', 12, 'bold'), command=self.start_scan_thread)
        self.start_btn.pack(pady=10, fill='x', padx=20)
        
        self.stop_btn = tk.Button(root, text="EMERGENCY STOP [F12]", bg="#dc2626", fg="white", 
                                  font=('Helvetica', 10, 'bold'), command=self.stop_scan)
        self.stop_btn.pack(pady=5, fill='x', padx=20)
        
        # Area de Logs
        self.log_area = scrolledtext.ScrolledText(root, width=70, height=18, bg="#1e293b", fg="#e2e8f0", 
                                                  font=("Courier New", 9))
        self.log_area.pack(pady=10, padx=20)
        
        # Atalhos Globais
        try:
            keyboard.add_hotkey('f9', self.start_scan_thread)
            keyboard.add_hotkey('f12', self.stop_scan)
        except Exception as e:
            self.log(f"[WARN] Não foi possível registrar atalhos (Execute como root/admin): {e}")
        
        self.log("[SYSTEM] GhostScanner inicializado e aguardando comandos.")
        
    def log(self, msg):
        self.log_area.insert(tk.END, msg + "\\n")
        self.log_area.see(tk.END)
        
    def stop_scan(self):
        self.running = False
        self.log("[STOP] Emergency stop accionado [F12]. Varredura interrompida!")

    def start_scan_thread(self):
        if not self.running:
            self.running = True
            threading.Thread(target=self.run_scan, daemon=True).start()
            
    def run_scan(self):
        self.log("[INFO] Iniciando processo de varredura automatizada...")
        
        if not os.path.exists('produtos.json'):
            # Gera um arquivo de exemplo se não existir
            example_data = ["Smartphone Galaxy S23 Ultra", "Placa de Video RTX 4080"]
            with open('produtos.json', 'w', encoding='utf-8') as f:
                json.dump(example_data, f, ensure_ascii=False, indent=4)
            self.log("[WARN] 'produtos.json' não encontrado. Criado arquivo de exemplo.")

        try:
            with open('produtos.json', 'r', encoding='utf-8') as f:
                produtos = json.load(f)
            self.log(f"[INFO] {len(produtos)} itens carregados do produtos.json.")
        except Exception as e:
            self.log(f"[ERROR] Falha ao ler produtos.json: {e}")
            self.running = False
            return
            
        os.makedirs('todos_os_precos', exist_ok=True)
        
        for idx, produto in enumerate(produtos):
            if not self.running:
                break
                
            self.log(f"\\n[WORK] Processando [{idx+1}]: '{produto}'...")
            self.log("> Foco detectado. (Assumindo que o usuário clicou na barra de busca)")
            
            # Etapa 1: Digitar Pesquisa
            pyautogui.typewrite(produto, interval=0.03) # Ajuste este tempo se necessário
            pyautogui.press('enter')
            
            # Etapa 2: Aguardar carregamento (Configurável na UI)
            delay = self.delay_var.get()
            self.log(f"> Aguardando carregamento da página ({delay}s)...")
            time.sleep(delay)
            
            if not self.running: break
            
            # Etapa 3: Selecionar tudo e Copiar (Ctrl+A -> Ctrl+C)
            self.log("> Executando Ctrl+A -> Ctrl+C ...")
            pyautogui.hotkey('ctrl', 'a')
            time.sleep(0.5)
            pyautogui.hotkey('ctrl', 'c')
            time.sleep(0.5)
            
            # Etapa 4: Extrair texto da área de transferência
            texto_bruto = pyperclip.paste()
            
            self.log(f"> Dados capturados! Tamanho do texto: {len(texto_bruto)} caracteres.")
            
            # Salvar no JSON
            resultado = { "produto": produto, "texto_bruto": texto_bruto }
            safe_name = "".join([c if c.isalnum() else "_" for c in produto]).lower()
            nome_arquivo = f"todos_os_precos/{safe_name}.json"
            
            try:
                with open(nome_arquivo, 'w', encoding='utf-8') as out:
                    json.dump(resultado, out, ensure_ascii=False, indent=4)
                self.log(f"> Salvo em: ./{nome_arquivo}")
                self.log(f"[SUCS] Item '{produto}' finalizado com sucesso.")
            except Exception as e:
                self.log(f"[ERROR] Falha ao salvar arquivo: {e}")
            
            if self.running and idx < len(produtos) - 1:
                self.log(f"Iniciando próximo item em 2s...")
                time.sleep(2)
            
        self.running = False
        self.log("\\n[INFO] Sequencia de varredura concluída.")

if __name__ == "__main__":
    root = tk.Tk()
    app = GhostScannerApp(root)
    root.mainloop()

# ==========================================
# INSTRUÇÕES DE COMPILAÇÃO (Linux / Geral):
# ==========================================
# pyinstaller --noconfirm --onefile --windowed --name "GhostScanner" main.py
`;
