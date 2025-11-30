import { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

// Pricing configuration - values to be filled in later
const pricingConfig = {
  Minimum: [
    { maxEmployees: 10, pricePerEmployee: 0 },    // To be filled
    { maxEmployees: 25, pricePerEmployee: 0 },
    { maxEmployees: 50, pricePerEmployee: 0 },
    { maxEmployees: 100, pricePerEmployee: 0 },
    { maxEmployees: 500, pricePerEmployee: 0 },
  ],
  Basic: [
    { maxEmployees: 10, pricePerEmployee: 0 },
    { maxEmployees: 25, pricePerEmployee: 0 },
    { maxEmployees: 50, pricePerEmployee: 0 },
    { maxEmployees: 100, pricePerEmployee: 0 },
    { maxEmployees: 500, pricePerEmployee: 0 },
  ],
  Support: [
    { maxEmployees: 10, pricePerEmployee: 0 },
    { maxEmployees: 25, pricePerEmployee: 0 },
    { maxEmployees: 50, pricePerEmployee: 0 },
    { maxEmployees: 100, pricePerEmployee: 0 },
    { maxEmployees: 500, pricePerEmployee: 0 },
  ],
};

interface CalculatorResult {
  priceBeforeKela: number;
  priceAfterKela: number;
  showRiskWarning: boolean;
}

const PriceCalculator = () => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [employees, setEmployees] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<'Minimum' | 'Basic' | 'Support'>('Basic');
  const [location, setLocation] = useState<string>('');
  const [isRiskIndustry, setIsRiskIndustry] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showOtherLocationInfo, setShowOtherLocationInfo] = useState(false);

  const calculatePrice = () => {
    const employeeCount = parseInt(employees);
    
    if (isNaN(employeeCount) || employeeCount < 1) {
      return;
    }

    // If risk industry, show warning
    if (isRiskIndustry === 'yes') {
      setResult({
        priceBeforeKela: 0,
        priceAfterKela: 0,
        showRiskWarning: true,
      });
      return;
    }

    // Find the appropriate price tier
    const priceTiers = pricingConfig[selectedPackage];
    const tier = priceTiers.find(t => employeeCount <= t.maxEmployees) || priceTiers[priceTiers.length - 1];
    
    const monthlyPrice = employeeCount * tier.pricePerEmployee;
    const priceAfterKela = monthlyPrice * 0.45; // 55% Kela subsidy

    setResult({
      priceBeforeKela: monthlyPrice,
      priceAfterKela: priceAfterKela,
      showRiskWarning: false,
    });
  };

  const isFormValid = () => {
    return employees !== '' && 
           parseInt(employees) >= 1 && 
           location !== '' && 
           isRiskIndustry !== '';
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowOtherLocationInfo(value === 'other');
  };

  if (!isExpanded) {
    return (
      <section id="calculator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Button
              size="lg"
              onClick={() => setIsExpanded(true)}
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-glow"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t('calculator.openButton')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsExpanded(false);
                setResult(null);
              }}
              className="absolute right-4 top-4"
              aria-label={t('calculator.close')}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">{t('calculator.title')}</CardTitle>
            </div>
            <CardDescription className="text-base">{t('calculator.subtitle')}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Form Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Employee Count */}
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-base font-semibold">
                  {t('calculator.employeesLabel')}
                </Label>
                <Input
                  id="employees"
                  type="number"
                  min="1"
                  max="500"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  placeholder={t('calculator.employeesPlaceholder')}
                  className="text-base"
                />
                {employees && (parseInt(employees) < 1 || parseInt(employees) > 500) && (
                  <p className="text-sm text-destructive">{t('calculator.employeesError')}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-semibold">
                  {t('calculator.locationLabel')}
                </Label>
                <Select value={location} onValueChange={handleLocationChange}>
                  <SelectTrigger id="location" className="text-base">
                    <SelectValue placeholder={t('calculator.locationPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uusimaa">{t('calculator.locationUusimaa')}</SelectItem>
                    <SelectItem value="pirkanmaa">{t('calculator.locationPirkanmaa')}</SelectItem>
                    <SelectItem value="other">{t('calculator.locationOther')}</SelectItem>
                  </SelectContent>
                </Select>
                {showOtherLocationInfo && (
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-md">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {t('calculator.locationOtherInfo')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Package Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t('calculator.packageLabel')}</Label>
              <RadioGroup value={selectedPackage} onValueChange={(value: any) => setSelectedPackage(value)}>
                <div className="grid md:grid-cols-3 gap-4">
                  {(['Minimum', 'Basic', 'Support'] as const).map((pkg) => (
                    <div key={pkg} className="relative">
                      <RadioGroupItem
                        value={pkg}
                        id={pkg}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={pkg}
                        className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50"
                      >
                        <span className="font-semibold text-lg mb-1">{t(`services.${pkg.toLowerCase()}.name`)}</span>
                        <span className="text-sm text-muted-foreground text-center">
                          {t(`services.${pkg.toLowerCase()}.desc`)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Risk Industry */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">{t('calculator.riskLabel')}</Label>
              <RadioGroup value={isRiskIndustry} onValueChange={setIsRiskIndustry}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="no" id="risk-no" className="peer sr-only" />
                    <Label
                      htmlFor="risk-no"
                      className="flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50"
                    >
                      <span className="font-medium">{t('calculator.riskNo')}</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="yes" id="risk-yes" className="peer sr-only" />
                    <Label
                      htmlFor="risk-yes"
                      className="flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50"
                    >
                      <span className="font-medium">{t('calculator.riskYes')}</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-900">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  {t('calculator.riskInfo')}
                </p>
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              size="lg"
              onClick={calculatePrice}
              disabled={!isFormValid()}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-glow disabled:opacity-50"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t('calculator.calculateButton')}
            </Button>

            {/* Results Section */}
            {result && (
              <div className="mt-8 space-y-6 animate-fade-in-up">
                {result.showRiskWarning ? (
                  <Card className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                        <div>
                          <CardTitle className="text-xl text-orange-900 dark:text-orange-100">
                            {t('calculator.riskWarningTitle')}
                          </CardTitle>
                          <CardDescription className="text-orange-800 dark:text-orange-200 mt-2">
                            {t('calculator.riskWarningText')}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {/* Price Before Kela */}
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">{t('calculator.priceBeforeKelaTitle')}</CardTitle>
                        <div className="text-4xl font-bold text-primary mt-2">
                          {result.priceBeforeKela.toFixed(2)} €<span className="text-xl font-normal text-muted-foreground">/kk</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {t('calculator.priceVatInfo')}
                        </p>
                      </CardHeader>
                    </Card>

                    {/* Price After Kela */}
                    <Card className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20">
                      <CardHeader>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-1" />
                          <div className="flex-1">
                            <CardTitle className="text-lg text-green-900 dark:text-green-100">
                              {t('calculator.priceAfterKelaTitle')}
                            </CardTitle>
                            <div className="text-4xl font-bold text-green-700 dark:text-green-300 mt-2">
                              {result.priceAfterKela.toFixed(2)} €<span className="text-xl font-normal text-green-600 dark:text-green-400">/kk</span>
                            </div>
                            <p className="text-sm text-green-800 dark:text-green-200 mt-2">
                              {t('calculator.kelaSubsidyInfo')}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Disclaimer */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {t('calculator.disclaimer')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PriceCalculator;
