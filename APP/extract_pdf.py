import PyPDF2
import os
import json

def extract_pdf_content(pdf_path):
    """Extrai o conteúdo de um arquivo PDF e salva em um arquivo de texto"""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            
            # Extrair texto de cada página
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text += f"\n--- Página {page_num+1} ---\n"
                text += page.extract_text()
            
            # Salvar o texto extraído em um arquivo
            output_path = os.path.join(os.path.dirname(pdf_path), 'pdf_content.txt')
            with open(output_path, 'w', encoding='utf-8') as output_file:
                output_file.write(text)
            
            print(f"Conteúdo extraído e salvo em: {output_path}")
            return True
    except Exception as e:
        print(f"Erro ao extrair conteúdo do PDF: {e}")
        return False

if __name__ == "__main__":
    pdf_path = "/home/ubuntu/upload/Documento completo ReVitaliza Fitness.pdf"
    extract_pdf_content(pdf_path)
