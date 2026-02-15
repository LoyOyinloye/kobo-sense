// ============================================
// KoboSense — Statement Upload Page (Screen 4)
// ============================================

import { navigate } from '../router.js';
import { store } from '../state.js';
import { parseCSV } from '../parser.js';

export function uploadPage() {
    const html = `
    <div class="upload-page">
      <div class="bank-header">
        <div class="bank-header-nav">
          <div class="bank-back" id="upload-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="bank-label anim-fade-in-up delay-1">Upload</div>
        <h1 class="bank-title anim-fade-in-up delay-1">Your Statement</h1>
        <p class="bank-subtitle anim-fade-in-up delay-2">Upload your bank statement to begin analysis.</p>
      </div>

      <div class="upload-zone anim-fade-in-up delay-2" id="upload-zone">
        <div class="upload-zone-icon">📄</div>
        <h3>Drag & Drop</h3>
        <p>or tap to browse files</p>
        <p class="upload-browse">Supports CSV or PDF (Max 5MB)</p>
        <input type="file" id="file-input" accept=".csv,.pdf,.CSV,.PDF" style="display:none" />
        <div id="file-info-container"></div>
      </div>

      <div class="upload-help anim-fade-in delay-3" id="help-link">
        <span>❓</span>
        <span>How to download your statement</span>
      </div>

      <div style="flex:1"></div>

      <div class="bank-actions">
        <button class="btn btn-primary btn-full btn-lg" id="upload-continue" disabled>
          Analyze Statement
        </button>
      </div>

      <div id="help-tooltip" style="display:none; padding: 0 24px; margin-top: -16px;">
        <div class="card" style="padding: 16px; font-size: 13px; color: var(--color-text-secondary); line-height: 1.7;">
          <strong style="color: var(--color-text);">Steps:</strong><br/>
          1. Log in to your bank's mobile app or internet banking<br/>
          2. Navigate to "Account Statement" or "Transaction History"<br/>
          3. Select a date range (1-3 months recommended)<br/>
          4. Download as CSV or PDF<br/>
          5. Upload the file here
        </div>
      </div>
    </div>
  `;

    return {
        html,
        init() {
            const zone = document.getElementById('upload-zone');
            const fileInput = document.getElementById('file-input');
            const continueBtn = document.getElementById('upload-continue');
            const helpLink = document.getElementById('help-link');
            const helpTooltip = document.getElementById('help-tooltip');
            let selectedFile = null;

            // Drag & drop
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) handleFile(files[0]);
            });

            zone.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) handleFile(e.target.files[0]);
            });

            helpLink.addEventListener('click', () => {
                helpTooltip.style.display = helpTooltip.style.display === 'none' ? 'block' : 'none';
            });

            document.getElementById('upload-back')?.addEventListener('click', () => {
                navigate('bank-select');
            });

            function handleFile(file) {
                // Validate size
                if (file.size > 5 * 1024 * 1024) {
                    alert("That file is too large. Please use a file under 5MB.");
                    return;
                }

                // Validate type
                const ext = file.name.split('.').pop().toLowerCase();
                if (!['csv', 'pdf'].includes(ext)) {
                    alert("This file type isn't supported yet. Please use CSV or PDF.");
                    return;
                }

                selectedFile = file;
                continueBtn.disabled = false;

                // Show file info
                const container = document.getElementById('file-info-container');
                container.innerHTML = `
          <div class="upload-file-info">
            <div class="upload-file-icon">${ext === 'csv' ? '📊' : '📄'}</div>
            <div>
              <div class="upload-file-name">${file.name}</div>
              <div class="upload-file-size">${(file.size / 1024).toFixed(1)} KB</div>
            </div>
            <div class="upload-file-remove" id="remove-file">✕</div>
          </div>
        `;

                document.getElementById('remove-file')?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectedFile = null;
                    container.innerHTML = '';
                    continueBtn.disabled = true;
                    fileInput.value = '';
                });
            }

            continueBtn.addEventListener('click', async () => {
                if (!selectedFile) return;

                const ext = selectedFile.name.split('.').pop().toLowerCase();

                if (ext === 'csv') {
                    try {
                        const text = await selectedFile.text();
                        const transactions = parseCSV(text);
                        store.set({ transactions });
                        navigate('parsing');
                    } catch (err) {
                        alert(err.message || "We couldn't read that file. Try a clear CSV.");
                    }
                } else {
                    // PDF - show a note for now
                    alert("PDF parsing is coming soon! For now, please export your statement as CSV from your banking app.");
                }
            });
        }
    };
}
