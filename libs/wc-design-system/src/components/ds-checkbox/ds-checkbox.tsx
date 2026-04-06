import { Component, Prop, State, h, Event, EventEmitter, Watch } from '@stencil/core';

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
        <label
          htmlFor={this.inputId}
          class="inline-flex items-center gap-2 cursor-pointer select-none text-[var(--text)]"
        >
          <input
            ref={(el) => (this.inputEl = el as HTMLInputElement)}
            id={this.inputId}
            type="checkbox"
            checked={this.checked}
            disabled={this.disabled}
            class="h-4 w-4 rounded border-[var(--border-color)] accent-[var(--color-primary)] focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-describedby={this.helperText ? `${this.inputId}-helper` : undefined}
            onChange={(e: Event) => {
              const val = (e.target as HTMLInputElement).checked;
              this.checked = val;
              this.dsChange.emit(val);
            }}
          />
          {this.label && <span class="text-[var(--font-size-md)]">{this.label}</span>}
        </label>
        {this.helperText && (
          <p id={`${this.inputId}-helper`} class="text-[var(--font-size-sm)] text-[var(--text-muted)] ml-6">
            {this.helperText}
          </p>
        )}
      </div>
    );
  }
}
