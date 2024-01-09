from .types import *
from .functions import *


@ae_script_decorator
def main():
    app = Application()
    selLayers = app.project.activeItem.selectedLayers
    for layer in selLayers:
        layer.applyPreset


main()
