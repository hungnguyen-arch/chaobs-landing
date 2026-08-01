import re

navbar = '''    <nav class="navbar">
        <div class="container nav-content">
            <div class="logo">
                <a href="index.html" style="color: inherit; text-decoration: none; display: flex; align-items: center; gap: 8px;">
                    <i class="ph-fill ph-heartbeat"></i>
                    <span>Hello Doctor AI</span>
                </a>
            </div>
            <div class="nav-links">
                <a href="index.html#features" data-i18n="nav_ai" style="color: var(--primary); font-weight: 600;">AI</a>
                <a href="index.html#architecture" data-i18n="nav_health_record">Health Record</a>
                <a href="cham-soc-lien-tuc.html" data-i18n="nav_continuous_care">Continuous Care</a>
                <a href="index.html#pricing" data-i18n="nav_pricing">Pricing</a>
                <div class="dropdown">
                    <a href="index.html#ecosystem" class="dropbtn" data-i18n="nav_solutions">Solutions <i class="ph ph-caret-down"></i></a>
                    <div class="dropdown-content">
                        <a href="duoc-pham.html" data-i18n="nav_pharma">Pharma</a>
                        <a href="bac-si.html" data-i18n="nav_clinic">Clinic</a>
                        <a href="doanh-nghiep.html" data-i18n="nav_enterprise">Enterprise</a>
                        <a href="bao-hiem.html" data-i18n="nav_insurance">Insurance</a>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 15px; align-items: center;">
                <button id="lang-toggle" class="btn-lang">EN | VI</button>
                <a href="contact.html" class="btn btn-outline" data-i18n="nav_contact">Contact Us</a>
                <button class="mobile-menu-btn" id="mobile-menu-btn"><i class="ph ph-list"></i></button>
            </div>
        </div>
    </nav>'''

mobile_script = '''
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const menuBtn = document.getElementById("mobile-menu-btn");
            const navLinks = document.querySelector(".nav-links");
            if (menuBtn && navLinks) {
                menuBtn.addEventListener("click", () => {
                    navLinks.classList.toggle("active");
                });
            }
        });
    </script>
'''

files_to_update = ['/Users/mac/benh_an_v02/chaobs_landing/about.html', '/Users/mac/benh_an_v02/chaobs_landing/contact.html']

for file in files_to_update:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace navbar
    content = re.sub(r'<nav class="navbar">.*?</nav>', navbar, content, flags=re.DOTALL)
    
    # Add script if not there
    if 'id="mobile-menu-btn"' not in content:
        # Well, the navbar injection above added it to HTML, we need the JS block
        pass
        
    if 'navLinks.classList.toggle("active");' not in content:
        content = content.replace('</body>', mobile_script + '\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Fixed {file}")
