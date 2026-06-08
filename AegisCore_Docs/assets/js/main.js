
document.addEventListener('DOMContentLoaded', function() {
    console.log('AegisCore Documentation loaded');
    const tocLinks = document.querySelectorAll('.toc a');
    for(let link of tocLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
    