

export class BodyAttribute {
  alias: string;
  constructor(public model: string, public variable: string) {
    this.alias = this.getAlias();
  }

  private getAlias() {
    switch (this.model) {
      case 'customer':
        return this.customerVariable();
      case 'user':
        return this.userVariable();
      case 'work':
        return this.workVariable();

      default:
        console.error('unknown model in SchemaBodyPipe');
    }
  }

  private customerVariable() {
    switch (this.variable) {
      case 'name':
        return 'Imie klientki';
      case 'surname':
        return 'Nazwisko klientki';

      default:
        console.error('unknown variable variable from customer model in SchemaBodyPipe');
    }
  }

  private userVariable() {
    switch (this.variable) {
      case 'name':
        return 'Nazwa salonu';

      default:
        console.error('unknown variable variable from user model in SchemaBodyPipe');
    }
  }

  private workVariable() {
    switch (this.variable) {
      case 'start_date':
        return 'data wizyty';
      case 'start_hour':
        return 'godzina wizyty';

      default:
        console.error('unknown variable variable from work model in SchemaBodyPipe');
    }
  }
}
