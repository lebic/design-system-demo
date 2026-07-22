import { Component, Prop, State, h, Event, EventEmitter, Watch } from '@stencil/core';
import { checkboxRecipe, checkboxLabel, fieldHelp } from '@design-system/recipes';

@Component({
  tag: 'ds-checkbox',
  shadow: false,
})
export class DsCheckbox {
  @Prop({ mutable: true }) checked = false;
  @Prop() label = '';
  @Prop() helperText = '';
  @Prop() disabled = false;
  @Prop() indeterminate = false;
  @Prop() inputId = `ds-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  @Event() dsChange!: EventEmitter<boolean>;

  private inputEl?: HTMLInputElement;

  @Watch('indeterminate')
  onIndeterminateChange(val: boolean) {
    if (this.inputEl) {
      this.inputEl.indeterminate = val;
    }
  }

  componentDidLoad() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  render() {
    return (
      <div class="flex flex-col gap-1">
        <label htmlFor={this.inputId} class={checkboxLabel}>
          <input
            ref={(el) => (this.inputEl = el as HTMLInputElement)}
            id={this.inputId}
            type="checkbox"
            checked={this.checked}
            disabled={this.disabled}
            class={checkboxRecipe()}
            aria-describedby={this.helperText ? `${this.inputId}-helper` : undefined}
            onChange={(e: Event) => {
              const val = (e.target as HTMLInputElement).checked;
              this.checked = val;
              this.dsChange.emit(val);
            }}
          />
          {this.label && <span class="text-base">{this.label}</span>}
        </label>
        {this.helperText && (
          <p id={`${this.inputId}-helper`} class={`${fieldHelp} ml-6`}>
            {this.helperText}
          </p>
        )}
      </div>
    );
  }
}
