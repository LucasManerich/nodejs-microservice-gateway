import YAML from "yaml";
import fs from "fs";

export default class YamlReader {
  private readonly fileName = "properties.yml";
  private static instance: YamlReader;

  /**
   * Retorna o conteúdo do arquivo de propriedades
   */
  private getFileContent() {
    try {
      return fs.readFileSync(this.fileName, "utf8");
    } catch (err) {
      console.log(err);
      throw new Error(`Falha ao carregar o arquivo '${this.fileName}'.`);
    }
  }

  /**
   * Retorna o YAML com objeto
   */
  public get() {
    const content = this.getFileContent();
    try {
      return YAML.parse(content);
    } catch (err) {
      console.log(err);
      throw new Error("Falha ao analisar o conteúdo YAML do arquivo.");
    }
  }

  /**
   * Retorna a instância da classe (Singleton)
   */
  public static getInstance() {
    if(this.instance == null) {
      this.instance = new YamlReader();
    }
    return this.instance;
  }
}
